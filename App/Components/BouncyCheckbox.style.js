export const iconContainer = (
  size,
  checked,
  borderRadius,
  borderColor,
  fillColor,
  unfillColor
) => {
  return {
    width: size,
    borderColor,
    borderRadius,
    height: size,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: checked ? fillColor : unfillColor
  };
};

export const textStyle = (checked, textColor, fontFamily, fontSize) => {
  return {
    fontFamily,
    fontSize: 16,
    color: "#fff",
    fontWeight: checked ? "bold" : "normal"
  };
};

export default {
  container: {
    marginTop: 15,
    marginRight: 20,
    alignItems: "center",
    flexDirection: "row"
  },
  textContainer: { marginLeft: 16 }
};
