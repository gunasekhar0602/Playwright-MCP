$ErrorActionPreference = 'Stop'

$repositoryRoot = git rev-parse --show-toplevel
if ($LASTEXITCODE -ne 0) {
    throw 'Run this script from inside the Git repository.'
}

$hookPath = Join-Path $repositoryRoot '.githooks\pre-push'
if (-not (Test-Path $hookPath)) {
    throw "Git pre-push hook was not found: $hookPath"
}

git -C $repositoryRoot config --local core.hooksPath .githooks
if ($LASTEXITCODE -ne 0) {
    throw 'Could not configure Git to use the repository hooks.'
}

Write-Host 'Git pre-push hook enabled for this local repository.'
Write-Host 'Each git push will build playwright-mcp:latest in Docker Desktop and run its tests.'
