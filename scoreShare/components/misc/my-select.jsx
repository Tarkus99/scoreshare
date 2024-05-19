import {
  Select,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { v4 } from "uuid";

export const MySelect = ({ className, array, children, ...field }) => {
  return (
    <Select {...field} className={className}>
      {children}
      <SelectContent>
        {array.map((item) => (
          <SelectItem key={v4()} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
