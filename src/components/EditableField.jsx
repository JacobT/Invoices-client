const EditableField = ({ mode, label, display, input }) => {
    return (
        <div>
            {label}
            {mode === "show" ? display : input}
        </div>
    );
};

export default EditableField;
