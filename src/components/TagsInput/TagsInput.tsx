import { FC, useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { useFormContext } from "react-hook-form";
import TagsInputComp from "react-tagsinput";
import "./react-tagsinput.css";

type TagsInputProps = {
  name: string;
  label?: string;
  error?: boolean;
  disabledInput?: boolean;
};

export const TagsInput: FC<TagsInputProps> = ({ name, label }) => {
  const { register, setValue, getValues } = useFormContext();
  const [hasSetTags, setHasSetTags] = useState(false);
  const formTags: string[] = getValues(name);
  const [tags, setTags] = useState(formTags);

  useEffect(() => {
    if (!hasSetTags && tags.length === 0 && formTags.length > 0) {
      setTags(formTags);
      setHasSetTags(true);
    }
  }, [hasSetTags, getValues(name)]);

  return (
    <div>
      <Typography as="label" className="text-sm text-blue-gray-400">
        {label}
      </Typography>
      <TagsInputComp
        {...register(name)}
        value={tags}
        onChange={tags => {
          setValue("tags", tags);
          setTags(tags);
        }}
      />
    </div>
  );
};
