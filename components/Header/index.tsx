import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuType from '../../Types/MenuType';

type HeaderProps = {menus?: Array<MenuType>};

const ResponsiveHeader = ({menus = []}: HeaderProps) => {
  return (
    <AppBar position="fixed" color="transparent"
      sx = {{
        backgroundColor: '#fff',
        boxShadow: '0px 0px 15px 0px rgb(0 0 0 / 10%)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters
          sx = {{
            minHeight: {xs: 80},
          }}
        >
          <Typography component="a" href="/" data-testid="heading">
            React To Do List
          </Typography>
          <Box sx={{ flexGrow: 1, justifyContent: 'flex-end', display: 'flex'}} data-testid="menu">
            {menus.map((menu, index) => (
              <Button
                key={index}
                sx={{ 
                  display: 'block', 
                  pl: 2, 
                  pr: 2,
                  textTransform: 'none',
                  fontSize: '1.12rem',
                }}
                onClick={menu.clickHandle}
              >
                {menu.title}
              </Button>
            ))}
          </Box>
        </Toolbar>        
      </Container>
    </AppBar>
  );
};
export default ResponsiveHeader;
