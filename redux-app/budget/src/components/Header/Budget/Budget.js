import React from "react";
import { connect } from "react-redux";
import { editBudgetAmount, onEditClick } from "../../../redux/actions/action";

class Budget extends React.Component {
  constructor(props) {
    super(props);
    this.budgetRef = React.createRef();
  }

  handleEdit = async () => {
    if (this.props.contentEditable) {
      const newAmount = this.budgetRef.current.innerHTML;
      this.props.editAmount(+newAmount);
    } else {
      await this.props.onEdit();
      this.budgetRef.current.focus();
    }
  };

  render() {
    return (
      <div>
        <div className="alert alert-secondary" role="alert">
          Budget:$
          <span
            contentEditable={this.props.contentEditable}
            suppressContentEditableWarning={true}
            ref={this.budgetRef}
          >
            {this.props.budget}
          </span>
          <span style={{ position: "absolute", right: "10px", top: "5px" }}>
            <button className="btn btn-primary" onClick={this.handleEdit}>
              {this.props.contentEditable ? "Set" : "Edit"}
            </button>
          </span>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    contentEditable: state.contentEditable,
    budget: state.budget,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onEdit: () => dispatch(onEditClick()),
    editAmount: (amount) => dispatch(editBudgetAmount(amount)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Budget);
