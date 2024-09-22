// components
import AttributeSubTitle from './AttributeSubTitle';
import AttributeTitle from './AttributeTitle';

// types
import { Attribute } from '../../../types/types';
interface AttributeInfoProps {
  attribute: Attribute;
}

const subtitles = {
  offset: `data-parallax-offset = "±number"`,
  opacity: `data-parallax-opacity = "start;end"`,
  scale: `data-parallax-scale = "start;end"`,
  rotation: `data-parallax-rotation = "start;end"`,
  skew: `data-parallax-skew = "start;end"`,
};

const AttributeInfo = ({ attribute }: AttributeInfoProps) => {
  return (
    <div className="relative mx-auto mb-4 w-[95%] md:w-full">
      <AttributeTitle>
        {attribute.charAt(0).toUpperCase() + attribute.slice(1)}
      </AttributeTitle>
      <AttributeSubTitle>{subtitles[attribute]}</AttributeSubTitle>
    </div>
  );
};

export default AttributeInfo;
