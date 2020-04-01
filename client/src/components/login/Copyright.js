import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function copyright(){
    return (
        <Typography variant="body2" color="textSecondary" align="center">
          {'Copyright © '}
          <Link color="inherit" href="https://material-ui.com/" target="_blank">
            Collection
          </Link>{' '}{new Date().getFullYear()}{'.'}
        </Typography>
    );
}
