import Button from "../../components/button/button";
import { COLORS, FONT_SIZE } from "../../constants/theme";

export const styles = {
    h1Cadastro: {
        textAlign: "center",
        fontSize: 25,
        color: COLORS.bordo
    },
    container: {
        backgroundColor: COLORS.creme,
        flex: 1,
        padding: 50,
        justifyContent: "space-between"
    },
    containerLogo: {
        alignItems: "center"
    },
    logo: {
        width: 295,
        height: 225
    },
    containerInput:{
        marginBottom: 15
    },
    input: {
        backgroundColor: COLORS.areia,
        margin: 5,
        padding: 12,
        borderRadius: 6 
    }, 
    footer: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row"
    },
    footerLink: {
        color: COLORS.bordo
    }
}