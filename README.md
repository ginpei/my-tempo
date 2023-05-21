# My Tempo

Hi.

# Getting started

1. `git clone …` and `npm ci`
2. Prepare a Firebase project, and
   1. Prepare `.env.local` by copying `.env.local.example`
   2. Prepare `.firebaserc` by copying `.firebaserc.example`

# Dev

## Emulator

- `npm run dev` starts dev server along with Firebase emulator
- To save emulator data, run `npm run firebase-export` while the emulator is running
- The emulator imports data from `.firebase-exports/` when it starts
