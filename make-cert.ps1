# Creates a self-signed certificate and exports it to cert\devcert.pfx
#
# Why: iPhone Safari requires HTTPS for camera access.
#
# Run:
#  powershell -ExecutionPolicy Bypass -File .\make-cert.ps1
#
# Output:
#  .\cert\devcert.pfx  (password: opticalaudio)
#  .\cert\devcert.cer  (optional: install on iPhone for trust)

$ErrorActionPreference = 'Stop'

$here = Split-Path -Parent $MyInvocation.MyCommand.Path
$certDir = Join-Path $here 'cert'
New-Item -ItemType Directory -Force -Path $certDir | Out-Null

$pfxPath = Join-Path $certDir 'devcert.pfx'
$cerPath = Join-Path $certDir 'devcert.cer'

$pass = ConvertTo-SecureString -String 'opticalaudio' -Force -AsPlainText

# Create in CurrentUser\My so it has an exportable private key.
$certParams = @{
  Subject           = 'CN=OpticalAudioLocal'
  DnsName           = @('localhost','OpticalAudioLocal')
  CertStoreLocation = 'Cert:\CurrentUser\My'
  KeyAlgorithm      = 'RSA'
  KeyLength         = 2048
  KeyExportPolicy   = 'Exportable'
  NotAfter          = (Get-Date).AddYears(2)
}

$cert = New-SelfSignedCertificate @certParams

Export-PfxCertificate -Cert $cert -FilePath $pfxPath -Password $pass | Out-Null
Export-Certificate -Cert $cert -FilePath $cerPath | Out-Null

Write-Host "Created:" -ForegroundColor Green
Write-Host "  $pfxPath (password: opticalaudio)"
Write-Host "  $cerPath (optional to trust on iPhone)"
Write-Host ""
Write-Host "Next: node .\server.js" -ForegroundColor Cyan
