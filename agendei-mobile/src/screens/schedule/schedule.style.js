import { COLORS, FONT_SIZE } from "../../constants/theme";

export const styles = {
        container: {
            flex: 1,
            backgroundColor: COLORS.creme,
            paddingLeft: 20,
            paddingRight: 20,
            justifyContent: "space-between",
            marginBottom: 20
        },
        theme: {
            todayTextColor: COLORS.creme,
            selectedDayBackgroundColor: COLORS.bordo,
            selectedDayTextColor: COLORS.bordo,
            arrowColor: COLORS.bordo
        },
        textHour: {
            fontSize: FONT_SIZE.lg,
            fontWeight: "bold",
            color: COLORS.blush,
            marginTop: 20

        }
    }