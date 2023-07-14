export default function Input({input}: any) {
   return (
      <tr>
         <td className="bg-slate-100">{input.label}</td>

         <td className="w-4/5 border">
            {input.type === "select" ? (
               <select ref={input.ref}>
                  <option value="">...</option>
                  {input.options.map((item: any, index: number) => (
                     <option key={index} value={item.value}>
                        {item.name}
                     </option>
                  ))}
               </select>
            ) : (
               <input type={input.type} ref={input.ref} onChange={input.onChange} />
            )}
         </td>
      </tr>
   );
}
