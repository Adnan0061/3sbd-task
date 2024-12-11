// import React from "react";
// import { Label } from "../ui/label";
// import {
//   Select,
//   SelectContent,
//   SelectTrigger,
//   SelectValue,
// } from "../ui/select";

// export default function PaginationSection() {
//   return (
//     <div>
//       <div>
//         <Label>Row per page</Label>
//         <Select
//           value={filters.searchGroupId.toString()}
//           onValueChange={(value) =>
//             onChange({ ...filters, searchGroupId: parseInt(value) })
//           }
//         >
//           <SelectTrigger id="group">
//             <SelectValue placeholder="All" />
//           </SelectTrigger>
//           <SelectContent>
//             {availableGroups?.map((group) => (
//               <SelectItem key={group.value} value={group.value}>
//                 {group.text}
//               </SelectItem>
//             ))}
//           </SelectContent>
//         </Select>
//       </div>
//       <div></div>
//       <div></div>
//     </div>
//   );
// }
