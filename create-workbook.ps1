$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.IO.Compression.FileSystem
$outFile = Join-Path $PSScriptRoot 'ventas-y-vendedores.xlsx'
$temp = Join-Path $env:TEMP ('vds-xlsx-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $temp | Out-Null
New-Item -ItemType Directory -Path (Join-Path $temp '_rels'), (Join-Path $temp 'xl'), (Join-Path $temp 'xl\_rels'), (Join-Path $temp 'xl\worksheets'), (Join-Path $temp 'xl\worksheets\_rels'), (Join-Path $temp 'xl\tables') | Out-Null
$sellers = @(
    @('V001','Andrea Salazar','943 120 101','andrea@ventadesoftware.pe','San Isidro'),
    @('V002','Marco Paredes','943 120 102','marco@ventadesoftware.pe','Miraflores'),
    @('V003','Camila Rojas','943 120 103','camila@ventadesoftware.pe','San Borja'),
    @('V004','Diego Torres','943 120 104','diego@ventadesoftware.pe','Surco'),
    @('V005','Lucía Vega','943 120 105','lucia@ventadesoftware.pe','Lima Centro')
)
$products = @(
    @('Microsoft 365 Empresa',469), @('Adobe Creative Cloud',239), @('Norton 360 Deluxe',189),
    @('QuickBooks Online',129), @('Canva Pro',359), @('Bitdefender Total Security',219)
)
$sales = [System.Collections.Generic.List[object]]::new()
for ($i = 0; $i -lt 50; $i++) {
    $product = $products[($i * 3 + [math]::Floor($i / 4)) % $products.Count]
    $seller = $sellers[$i % $sellers.Count]
    $qty = if ($i % 3 -eq 0) { 2 } else { 1 }
    $date = [datetime]::new(2026, (5 + ([math]::Floor($i / 10) % 6)), (1 + (($i * 7) % 28)))
    $customer = @('Comercial Andina SAC','Estudio Norte EIRL','Panadería Trigo & Miel','Grupo Horizonte SAC','Consultora Punto Lima')[$i % 5]
    $sales.Add(@("VTA-$('{0:D4}' -f ($i + 1))",$date.ToString('yyyy-MM-dd'),$seller[0],$customer,$product[0],$qty,$product[1],($qty * $product[1]),'Registrada'))
}
function XmlEscape([string]$s) { return [System.Security.SecurityElement]::Escape($s) }
function ColName([int]$n) {
    $s = ''
    while ($n -gt 0) { $r = ($n - 1) % 26; $s = [char](65 + $r) + $s; $n = [math]::Floor(($n - 1) / 26) }
    return $s
}
function MakeSheet([string]$path,[array]$headers,[array]$rows,[int]$tableId,[string]$tableName) {
    $xmlRows = [System.Collections.Generic.List[string]]::new()
    $allRows = [System.Collections.Generic.List[object]]::new()
    $allRows.Add($headers); foreach ($r in $rows) { $allRows.Add($r) }
    for ($ri = 0; $ri -lt $allRows.Count; $ri++) {
        $cells = [System.Collections.Generic.List[string]]::new()
        for ($ci = 0; $ci -lt $headers.Count; $ci++) {
            $ref = "$(ColName ($ci + 1))$($ri + 1)"; $val = $allRows[$ri][$ci]
            if ($ri -eq 0 -or $val -is [string]) { $cells.Add("<c r=`"$ref`" t=`"inlineStr`"><is><t>$(XmlEscape ([string]$val))</t></is></c>") }
            else { $cells.Add("<c r=`"$ref`"><v>$val</v></c>") }
        }
        $xmlRows.Add("<row r=`"$($ri + 1)`">$($cells -join '')</row>")
    }
    $lastCol = ColName $headers.Count; $lastRow = $allRows.Count
    $sheet = "<?xml version=`"1.0`" encoding=`"UTF-8`" standalone=`"yes`"?><worksheet xmlns=`"http://schemas.openxmlformats.org/spreadsheetml/2006/main`" xmlns:r=`"http://schemas.openxmlformats.org/officeDocument/2006/relationships`"><sheetViews><sheetView workbookViewId=`"0`"/></sheetViews><sheetFormatPr defaultRowHeight=`"18`"/><sheetData>$($xmlRows -join '')</sheetData><tableParts count=`"1`"><tablePart r:id=`"rId1`"/></tableParts></worksheet>"
    Set-Content -LiteralPath $path -Value $sheet -Encoding utf8
    $table = "<?xml version=`"1.0`" encoding=`"UTF-8`" standalone=`"yes`"?><table xmlns=`"http://schemas.openxmlformats.org/spreadsheetml/2006/main`" id=`"$tableId`" name=`"$tableName`" displayName=`"$tableName`" ref=`"A1:$($lastCol)$lastRow`" totalsRowShown=`"0`"><autoFilter ref=`"A1:$($lastCol)$lastRow`"/><tableColumns count=`"$($headers.Count)`">"
    for ($i=0; $i -lt $headers.Count; $i++) { $table += "<tableColumn id=`"$($i+1)`" name=`"$(XmlEscape ([string]$headers[$i]))`"/>" }
    $table += '</tableColumns><tableStyleInfo name="TableStyleMedium4" showFirstColumn="0" showLastColumn="0" showRowStripes="1" showColumnStripes="0"/></table>'
    Set-Content -LiteralPath (Join-Path $temp "xl\tables\table$tableId.xml") -Value $table -Encoding utf8
    Set-Content -LiteralPath (Join-Path $temp "xl\worksheets\_rels\sheet$($tableId)_rels.xml") -Value "<?xml version=`"1.0`" encoding=`"UTF-8`" standalone=`"yes`"?><Relationships xmlns=`"http://schemas.openxmlformats.org/package/2006/relationships`"><Relationship Id=`"rId1`" Type=`"http://schemas.openxmlformats.org/officeDocument/2006/relationships/table`" Target=`"../tables/table$tableId.xml`"/></Relationships>" -Encoding utf8
}
$salesHeaders = @('VentaID','Fecha','Vendedor','Cliente','Producto','Cantidad','PrecioUnitarioPEN','TotalPEN','Estado')
$sellerHeaders = @('Vendedor','Nombre','Telefono','Correo','Zona')
MakeSheet (Join-Path $temp 'xl\worksheets\sheet1.xml') $salesHeaders $sales.ToArray() 1 'ventas'
MakeSheet (Join-Path $temp 'xl\worksheets\sheet2.xml') $sellerHeaders $sellers 2 'vendedor'
$utf8 = [System.Text.UTF8Encoding]::new($false)
Set-Content -LiteralPath (Join-Path $temp '[Content_Types].xml') -Encoding utf8 -Value '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/worksheets/sheet2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/tables/table1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml"/><Override PartName="/xl/tables/table2.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml"/></Types>'
Set-Content (Join-Path $temp '_rels\.rels') -Encoding utf8 -Value '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>'
Set-Content (Join-Path $temp 'xl\workbook.xml') -Encoding utf8 -Value '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><bookViews><workbookView/></bookViews><sheets><sheet name="ventas" sheetId="1" r:id="rId1"/><sheet name="vendedor" sheetId="2" r:id="rId2"/></sheets></workbook>'
Set-Content (Join-Path $temp 'xl\_rels\workbook.xml.rels') -Encoding utf8 -Value '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet2.xml"/></Relationships>'
Set-Content (Join-Path $temp 'xl\worksheets\_rels\sheet1.xml.rels') -Encoding utf8 -Value '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/table" Target="../tables/table1.xml"/></Relationships>'
Set-Content (Join-Path $temp 'xl\worksheets\_rels\sheet2.xml.rels') -Encoding utf8 -Value '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/table" Target="../tables/table2.xml"/></Relationships>'
if (Test-Path $outFile) { Remove-Item -LiteralPath $outFile }
[System.IO.Compression.ZipFile]::CreateFromDirectory($temp,$outFile)
Remove-Item -LiteralPath $temp -Recurse -Force
Write-Output "Created $outFile with 50 sales and 5 sellers."
