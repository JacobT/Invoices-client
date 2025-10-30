export function InputSelect({
    required = false,
    label,
    name,
    handleChange,
    value,
    prompt,
    items,
    ...props
}) {
    return (
        <div className="form-group">
            {label && <label>{label}:</label>}
            <select
                required={required}
                className="browser-default form-select"
                name={name}
                onChange={handleChange}
                value={value}
                {...props} // předání dalších parametrů, např. id, disabled,...
            >
                <option key={0} disabled value="">
                    {prompt}
                </option>

                {items.map((item, index) => (
                    <option key={index + 1} value={item._id}>
                        {item.name}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default InputSelect;

// export function InputSelect(props) {
//     const multiple = props.multiple;
//     const required = props.required || false;

//     // příznak označení prázdné hodnoty
//     const emptySelected = multiple ? props.value?.length === 0 : !props.value;
//     // příznak objektové struktury položek
//     const objectItems = props.enum ? false : true;

//     return (
//         <div className="form-group">
//             <label>{props.label}:</label>
//             <select
//                 required={required}
//                 className="browser-default form-select"
//                 multiple={multiple}
//                 name={props.name}
//                 onChange={props.handleChange}
//                 value={props.value}
//             >
//                 {required ? (
//                     /* prázdná hodnota zakázaná (pro úpravu záznamu) */
//                     <option disabled value={emptySelected}>
//                         {props.prompt}
//                     </option>
//                 ) : (
//                     /* prázdná hodnota povolená (pro filtrování přehledu) */
//                     <option key={0} value={emptySelected}>
//                         ({props.prompt})
//                     </option>
//                 )}

//                 {objectItems
//                     ? /* vykreslení položek jako objektů z databáze (osobnosti) */
//                       props.items.map((item, index) => (
//                           <option
//                               key={required ? index : index + 1}
//                               value={item._id}
//                           >
//                               {item.name}
//                           </option>
//                       ))
//                     : /* vykreslení položek jako hodnot z výčtu (žánry) */
//                       props.items.map((item, index) => (
//                           <option
//                               key={required ? index : index + 1}
//                               value={item}
//                           >
//                               {props.enum[item]}
//                           </option>
//                       ))}
//             </select>
//         </div>
//     );
// }

// export default InputSelect;
