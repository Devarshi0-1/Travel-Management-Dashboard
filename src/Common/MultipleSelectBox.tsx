import { Typeahead } from "react-bootstrap-typeahead";

const MultipleSelectBox = () => {
  const data = [{ name: "Lifestyle" }, { name: "Travel" }];

  return (
    <Typeahead
      id="multiple-typeahead"
      className="mt-2"
      defaultSelected={data}
      labelKey="name"
      multiple
      options={data}
      placeholder="Select Your Name...."
    />
  );
};

export default MultipleSelectBox;
