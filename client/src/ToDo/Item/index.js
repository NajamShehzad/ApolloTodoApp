import React, { PureComponent } from "react";
import { updateTask, deleteTask } from "../../hocs";
import { Input } from "antd";
import "../todo.css";

class Item extends PureComponent {
    state = {
        editMode: false,
    }

    componentDidMount() {
        const { description } = this.props.row;
        this.setState({ description })
    }

    renderActions = ({ state }) => {
        if (state === "ToDo") {
            return (
                <span
                    className="done"
                    onClick={() => this.onChangeState("Done")}
                >
                    Done
        </span>
            );
        } else {
            return (
                <span
                    className="delete"
                    onClick={() => this.onDeleteItem()}
                >
                    Delete
        </span>
            );
        }
    };

    editMode = () => {
        const { editMode } = this.state;
        this.setState({ editMode: !editMode })
    }

    onChangeInput = (e) => {
        this.setState({ description: e.target.value }, async () => {
            try {
                const { updateTask } = this.props;
                const { description } = this.state;
                const { _id, state } = this.props.row;
                const res = await updateTask({ _id, description, state })
                console.log(res)
            } catch (err) {
                alert(err.message)
            }
        })
    }

    onChangeState = async (state) => {
        try {
            const { updateTask } = this.props;
            const { description } = this.state;
            const { _id } = this.props.row;
            const res = await updateTask({ _id, description, state })
            console.log(res)
        } catch (err) {
            alert(err.message)
        }
    }

    onDeleteItem = async () => {
        try {
            const { deleteTask } = this.props;
            const { _id } = this.props.row;
            const res = await deleteTask({ _id })
            console.log(res)
        } catch (err) {
            alert(err.message)
        }
    }

    render() {
        const { row, show } = this.props;
        const { editMode, description } = this.state;
        console.log(this.props)
        return (
            <div>
                {show === 'description' && (
                    editMode ? (
                        <Input
                            value={description}
                            onChange={this.onChangeInput}
                            onBlur={this.editMode}
                            autoFocus
                        />
                    ) : (
                            <span onClick={this.editMode}>
                                {description}
                            </span>
                        )
                )}
                {show === 'action' && (
                    this.renderActions(row)
                )}
            </div>
        );
    }
}

export default deleteTask(
    updateTask(Item)
);
