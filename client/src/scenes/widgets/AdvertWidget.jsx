import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import AdvertImage from "AdvertImage/AdvertImage";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
        <Typography color={medium}>Create Ad</Typography>
      </FlexBetween>
      <AdvertImage
      />
      <FlexBetween>
        <Typography color={main}></Typography>
        <Typography color={medium}></Typography>
      </FlexBetween>
      
    </WidgetWrapper>
  );
};

export default AdvertWidget;