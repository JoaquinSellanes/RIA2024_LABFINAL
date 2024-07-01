$dirs = @(
    "src/app/core/auth",
    "src/app/core/guards",
    "src/app/core/interceptors",
    "src/app/shared/components",
    "src/app/shared/directives",
    "src/app/features/admin/components",
    "src/app/features/admin/pages",
    "src/app/features/panadero/components",
    "src/app/features/panadero/pages",
    "src/app/features/cliente/components",
    "src/app/features/cliente/pages",
    "src/app/features/auth/components"
)

foreach ($dir in $dirs) {
    New-Item -ItemType Directory -Force -Path $dir
}

# Crear los archivos de módulo
New-Item -ItemType File -Force -Path "src/app/core/core.module.ts"
New-Item -ItemType File -Force -Path "src/app/shared/shared.module.ts"
New-Item -ItemType File -Force -Path "src/app/features/admin/admin.module.ts"
New-Item -ItemType File -Force -Path "src/app/features/panadero/panadero.module.ts"
New-Item -ItemType File -Force -Path "src/app/features/cliente/cliente.module.ts"
New-Item -ItemType File -Force -Path "src/app/features/auth/auth.module.ts"
New-Item -ItemType File -Force -Path "src/app/features/shared/shared.module.ts"
