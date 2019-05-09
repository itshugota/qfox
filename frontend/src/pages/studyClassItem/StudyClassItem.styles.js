import { makeStyles } from '@material-ui/styles';

export default makeStyles(theme => ({
  root: {},
  header: {
    backgroundColor: '#ffffff',
    padding: theme.spacing(4)
  },
  tabs: {
    marginTop: theme.spacing(2),
    backgroundColor: theme.palette.grey[50],
    border: `2px solid ${theme.palette.grey[500]}`,
    minHeight: 40,
    '& $tab:last-of-type': {
      borderRight: 'none'
    }
  },
  tabIndicator: {
    display: 'none'
  },
  tab: {
    borderRight: `2px solid ${theme.palette.grey[500]}`,
    minHeight: 40
  },
  selectedTab: {
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText
  },
  verticalDividerContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  verticalDivider: {
    height: '70%',
    margin: theme.spacing(0, 1.5),
    borderRight: `2px solid ${theme.palette.grey[300]}`
  },
  icon: {
    marginRight: theme.spacing(2),
    marginBottom: theme.spacing(-1)
  },
  fab: {
    marginLeft: theme.spacing(2)
  },
  linkText: {
    textAlign: 'right'
  },
  dialogTitle: {
    backgroundColor: '#673AB7',
    padding: theme.spacing(2)
  },
  dialogContent: {
    backgroundColor: theme.palette.grey[300]
  },
  dialogContentItem: {
    backgroundColor: '#ffffff',
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: 'center'
  },
  dialogContentSelect: {
    backgroundColor: '#ffffff',
    margin: theme.spacing(2)
  },
  dialogContentTextField: {
    margin: `${theme.spacing(2)}px 0`
  },
  dialogTitleText: {
    color: '#ffffff'
  }
}));
