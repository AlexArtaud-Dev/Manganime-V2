import {colors} from "../../theme";

module.exports = {
    container: {
        flex: 1,
        backgroundColor: colors.background["200"],
        alignItems: 'center',
        justifyContent: 'center',
    },
    heading: {
        fontSize: 60,
        fontWeight: 'bold',
        color: "white",
        marginBottom: 30,
        paddingTop: 40,
    },
    hoveredInput: {
        borderColor: colors.input.borderColor,
        borderWidth: 2,
    },
    button: {
        backgroundColor: colors.button.background,
    },
    activeButton: {
        backgroundColor: colors.button.backgroundActive,
    },
    signupLink: {
        color: colors.link.color,
        fontSize: 20,
        fontWeight: 'bold',
    }
}
