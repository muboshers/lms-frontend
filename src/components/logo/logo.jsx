import PropTypes from "prop-types";
import { forwardRef } from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

import { RouterLink } from "src/routes/components";

import { SelectTeachingCenter } from "src/store/auth.reducer";

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const teachingCenter = useSelector(SelectTeachingCenter);

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 150,
        height: 80,
        display: "inline-flex",
        ...sx,
      }}
      {...other}
    >
      <img
        src={teachingCenter?.logo.url}
        style={{
          width: "100%",
          height: "100%",
        }}
        alt={teachingCenter?.name}
      />
    </Box>
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: "contents" }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;
