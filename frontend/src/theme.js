import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    styles: {
        global: {
            "body" : {
                backgroundColor: "#fff"
            }
        }
    },
});

export default theme;