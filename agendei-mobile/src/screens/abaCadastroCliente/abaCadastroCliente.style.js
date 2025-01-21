import { COLORS, FONT_SIZE } from "../../constants/theme";

export const styles = {
    container: {
        backgroundColor: COLORS.creme,
        flex: 1,
        padding: 12,
    },
    text: {
        fontSize: FONT_SIZE.lg,
        fontWeight: 500,
        color: COLORS.bordo,
        marginBottom: 15,
        marginLeft: 10 
    },

    formContainer: {
        paddingBottom: 80,  // Espaço para o botão ficar abaixo
    },
    footerContainer: {
        position: "absolute",
        bottom: 20,
        left: 0,
        right: 0,
        paddingHorizontal: 12,
        zIndex: 1,  // Garante que o botão esteja acima dos outros componentes
    },
    input: {
        backgroundColor: "white",
        borderWidth: 1,
        borderColor: COLORS.areia,
        borderRadius: 6,
        marginBottom: 10
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFFFFF",
    },
    picker: {
        backgroundColor: "white"
    },
    procedimentosContainer: {
        marginVertical: 10,
    },
    procedimentoItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5,
    },
    procedimentoActions: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
    actionText: {
        color: "#3498db",
        marginLeft: 10,
    },
    // abaCadastroCliente.style.js

  // Estilos do Modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#fff",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "center",
    width: 120,
  },
  buttomCancel: {
    margin: 10
  },
  buttomSave: {
    margin: 10
  }
  
  // Outros estilos...
}
