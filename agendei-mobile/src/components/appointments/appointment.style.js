import { COLORS, FONT_SIZE } from "../../constants/theme";

export const styles = {
    appointment: {
            backgroundColor: COLORS.creme,
            flex: 1,
            padding: 12,
            borderWidth: 1,
            borderColor: COLORS.blush
        },
        name: {
            fontSize: FONT_SIZE.md,
            color: COLORS.bordo,
            marginBottom: 2,
            fontWeight: 600
        },
        nomeDoutor: {
            fontSize: FONT_SIZE.sm,
            color: COLORS.argila,
            marginBottom: 4,
            fontWeight: 300
        },
        icon: {
            width: 25,
            height: 25,
            marginRight: 5
        },
        bookingDate: {
            fontSize: FONT_SIZE.sm,
            color: COLORS.bordo,
            marginTop: 3
        },
        bookingHour: {
            fontSize: FONT_SIZE.sm,
            color: COLORS.bordo,
            marginTop: 3
        },
        booking: {
            flexDirection: "row"
        },
        containerBooking: {
            flex: 1
        },
        containerButton: {
            width: 175,
            marginTop: 5
        },
        container: {
            flexDirection: "row"
        }
    }