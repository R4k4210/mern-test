import React, { Component } from "react";
import { connect } from 'react-redux';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import styles from '../components/styles/Sidebar';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import { createMuiTheme } from '@material-ui/core/styles';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import { logOutUser } from '../redux/actions/user/userActions';
import LoyaltyRoundedIcon from '@material-ui/icons/LoyaltyRounded';
import SettingsIcon from '@material-ui/icons/Settings';

class Dashboard extends Component {
    
    state = {
        open: true,
        section: "Dashboard"
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    renderIcon(index) {
        switch(index) {
            case 0:
                return <DashboardIcon />;
            case 1:
                return <CollectionsBookmarkIcon/>;
            case 2:
                return <LoyaltyRoundedIcon />;
            case 3:
                return <SettingsIcon />;
            default:
                return null;
        }
    }

    handleLogOut = () => {
        this.props.history.push('/login');
        this.props.logOutUser();
    }

    render() {
        
        const theme = createMuiTheme();
        const { classes } = this.props;
        const { open } = this.state;
        const { userReducer } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    className={clsx(classes.appBar, {
                        [classes.appBarShift]: open,
                    })}
                >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.handleDrawerOpen}
                            edge="start"
                            className={clsx(classes.menuButton, {
                                [classes.hide]: open,
                            })}
                        >
                        <MenuIcon />
                        </IconButton>
                        <Typography 
                            className={classes.title} 
                            variant="h6" 
                            noWrap
                            style={{"flex":"auto"}}
                        >
                            {this.state.section}
                        </Typography>
                        <Button 
                            color="inherit"
                            onClick={this.handleLogOut}
                        >
                            <ExitToAppIcon/>
                            <Typography noWrap>
                                Log Out
                            </Typography>
                        </Button>
                    </Toolbar>
                </AppBar>
                <Drawer
                    variant="permanent"
                    className={clsx(classes.drawer, {
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    })}
                    classes={{
                        paper: clsx({
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open,
                        }),
                    }}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.handleDrawerClose}>
                            { theme.direction === "rtl" ? (
                                <ChevronRightIcon />
                            ) : (
                                    <ChevronLeftIcon />
                            ) }
                        </IconButton>
                    </div>
                    <Divider />
                    <Box className={classes.avatarContainer} pr={2} pl={2} mb={2}>
                        <Avatar 
                            alt="Profile photo" 
                            src={userReducer.member.user.picture}
                            className={classes.avataImg}
                        />
                        <Box display={open ? ('block'):('none')}>
                        <Typography className={classes.avatarText}>
                            {
                                userReducer.member.user.firstname + " " +
                                userReducer.member.user.lastname
                            } 
                        </Typography>
                        </Box>
                    </Box>
                    <Divider />
                    <List>
                        {["Dashboard", "Collections", "Tags", "Settings"].map((text, index) => (
                            <ListItem 
                                button 
                                key={text}
                                onClick={() => console.log("clicked => ", text, "/ index => ", index)}
                            >
                                <ListItemIcon>
                                    { this.renderIcon(index) }
                                </ListItemIcon>
                                <ListItemText primary={text} />
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    
                </main>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { 
        userReducer: state.userReducer,
        utilsReducer: state.utilsReducer
    }
}

export default connect(mapStateToProps, { logOutUser })(withStyles(styles)(Dashboard));

