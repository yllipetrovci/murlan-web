const UsernameInput = ({ username, onChangeUsernameHandle }) => {
    return (
        <input
            type="text"
            value={username}
            placeholder="username"
            onChange={onChangeUsernameHandle}
        />
    );
};

export default UsernameInput;
