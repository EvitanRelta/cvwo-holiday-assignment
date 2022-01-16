import { ThemeOptions } from "@mui/material";

declare module '@mui/material/styles' {
    interface Palette {
        google: Palette['primary'];
    }
    interface PaletteOptions {
        google: PaletteOptions['primary'];
    }
}
declare module '@mui/material/Button' {
    interface ButtonPropsColorOverrides {
        google: true;
    }
}

const themeBase: ThemeOptions = {
    palette: {
        google: {
            main: '#1a73e8',
            contrastText: 'white'
        },
        tonalOffset: 0.2
    },
    typography: {
        fontFamily: 'Verdana, sans-serif'
    },
    shape: {
        borderRadius: 10
    }
};

export default themeBase;