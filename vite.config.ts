import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import { readdirSync, existsSync } from 'node:fs'

const labsDirectory = resolve(import.meta.dirname, 'labs')

const labEntries = Object.fromEntries(
    readdirSync(labsDirectory, { withFileTypes: true })
        .filter((entry) => entry.isDirectory())
        .filter((entry) =>
            existsSync(
                resolve(
                    labsDirectory,
                    entry.name,
                    'index.html'
                )
            )
        )
        .map((entry) => [
            entry.name,
            resolve(
                labsDirectory,
                entry.name,
                'index.html'
            ),
        ])
)

export default defineConfig({
    base: '/caleb-dev-lab/',

    build: {
        rolldownOptions: {
            input: {
                main: resolve(
                    import.meta.dirname,
                    'index.html'
                ),

                ...labEntries,
            },
        },
    },
})