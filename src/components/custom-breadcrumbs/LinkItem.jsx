import PropTypes from 'prop-types';
import { Link as ReactRouterLink } from 'react-router-dom';

// @mui
import { Box, Link as MuiLink } from '@mui/material';

export default function BreadcrumbsLink({ link, activeLast, disabled }) {
  // eslint-disable-next-line react/prop-types
  const { name, href, icon } = link;
  const styles = {
    typography: 'body2',
    alignItems: 'center',
    color: 'text.primary',
    display: 'inline-flex',
    ...(disabled &&
      !activeLast && {
        cursor: 'default',
        pointerEvents: 'none',
        color: 'text.disabled',
      }),
  };

  const renderContent = (
    <>
      {icon && (
        <Box
          component="span"
          sx={{
            mr: 1,
            display: 'inherit',
            '& svg': { width: 20, height: 20 },
          }}
        >
          {icon}
        </Box>
      )}

      {name}
    </>
  );

  if (href) {
    return (
      <MuiLink component={ReactRouterLink} to={href} sx={styles}>
        {renderContent}
      </MuiLink>
    );
  }

  return <Box sx={styles}> {renderContent} </Box>;
}

BreadcrumbsLink.propTypes = {
  link: PropTypes.any,
  activeLast: PropTypes.any,
  disabled: PropTypes.bool,
};
