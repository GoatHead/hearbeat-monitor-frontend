import { ITheme } from 'office-ui-fabric-react'

export const appStyles = (theme: ITheme) => {
    return {
        root: [
            {
                backgroundColor: theme.semanticColors.bodyBackground,
                color: theme.semanticColors.bodyText,
                height: "100vh",
                display: "flex",
                width: "100%",
                justifyContent: "center",
                alignItems: "center"
            }
        ]
    };
};