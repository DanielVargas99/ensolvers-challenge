import React from 'react';
import PropTypes from 'prop-types';
// Styles:
import '../../styles/notesStyle.scss'

const AddEditModal = ({children, estado, cambiarEstado}) => {
    return (
        <div>
            {/* When "estado" is true, the modal window will be shown, otherwise it'll be hidden */}
            {estado &&
                <div className="modal myModal" tabIndex="-1" role="dialog">
                    <div className="modal-dialog modalContent" role="document">
                        <div className="modal-content">
                            {/* Modal Header */}
                            <div className="modal-header">
                                <h5 className="modal-title">Create/Edit note</h5>
                                <button type="button" className="close btn btn-close" data-dismiss="modal"
                                        aria-label="Close" onClick={() => cambiarEstado(false)} />
                            </div>
                            <div className="modal-body">
                                {/* Reusable body, renders children prop */}
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
};

AddEditModal.propTypes = {
    estado: PropTypes.bool.isRequired,
    cambiarEstado: PropTypes.func.isRequired
};

export default AddEditModal;
