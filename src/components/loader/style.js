import { makeStyles } from "@material-ui/core/styles";
const styles = makeStyles(theme => ({
  root: {
    position: "relative",
    display: "inline-block",
  },
  top: {
    color: theme.palette.primary
  },
  bottom: {
    color: theme.palette.primary[200],
    position: "absolute",
    left: 0,
  },
}));
export default styles;