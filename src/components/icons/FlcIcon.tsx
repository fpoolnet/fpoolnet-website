import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const FlcIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon sx={{ height: '21px', width: '15px' }} {...props} viewBox="0 0 15.74 21.105">
      <path
        d="M 14.72 12.416 L 6.283 12.416 L 6.283 21.132 L 1.888 21.132 L 1.888 7.487 L 0.009 7.487 L 0.009 4.792 L 1.888 4.792 L 1.888 -0.196 L 15.775 -0.196 L 15.775 3.363 L 6.283 3.363 L 6.283 4.792 L 10.069 4.792 L 10.069 7.487 L 6.283 7.487 L 6.283 8.871 L 14.72 8.871 L 14.72 12.416 Z"
        fill="#0056b3"
      />
    </SvgIcon>
  );
};

export default FlcIcon;
