$project = 'C:\Users\focussdev\orca\credmaispay-site'
$stdout = Join-Path $project '.vite.log'
$stderr = Join-Path $project '.vite.err.log'
Start-Process -FilePath 'npm.cmd' -ArgumentList @('run', 'dev', '--', '--port', '5174') -WorkingDirectory $project -WindowStyle Hidden -RedirectStandardOutput $stdout -RedirectStandardError $stderr
