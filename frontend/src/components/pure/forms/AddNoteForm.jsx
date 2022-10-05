import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// Styles:
import '../../../styles/notesStyle.scss'

const AddNoteForm = ({add, cambiarEstado}) => {
    
    const [tagList, setTagList] = useState([]);

    const initialValues = {
        title: '',
        content: ''
    }

    // Join tag list into a string, separate each tag with "#"
    const formatCategories = () => tagList.map((currentTag) => '#' + currentTag).join('');
    const stringCategories = formatCategories();

    const NoteSchema = Yup.object().shape(
        {
            title: Yup.string()
                .required('Note title is required'),
            content: Yup.string()
                .required('Note description is required')
        }
    )

    /**
     * Call addNote function and store the new note in the DB
     * @param {*} param0: note title and content
     */
    function addNote({title, content}){
        add(title, content, stringCategories);
    }

    /**
     * Add a new category for the note 
     * @param {*} newTag: (String) new category
     */
    function addCategory(e, newTag){
        e.preventDefault();
        const tempTags = [...tagList];
        tempTags.push(newTag);
        setTagList(tempTags);
    }

    /**
     * Remove a category of the note 
     * @param {*} tag: (String)
     */
    function removeCategory(tag){
        const index = tagList.indexOf(tag);
        const tempTags = [...tagList];
        tempTags.splice(index,1);
        setTagList(tempTags);
    }

    return (
        <div>
            <div className='mt-1'>
                <Formik
                    // *** Initial values that the form will take ***
                    initialValues={initialValues}
                    // *** Yup Validation Schema ***
                    validationSchema={NoteSchema}
                    // *** onSubmit Event ***
                    onSubmit={async values => {
                        // Call addNote function and close the modal popup when done
                        await addNote(values);
                        cambiarEstado(false);
                    }}
                >
                {/* Form props */}
                {({errors, touched, isSubmitting, values}) => (
                    <Form>
                        <Field id="title" type="text" name="title"
                               className='form-control form-control-lg' placeholder="Note title" />
                        { /* Note title Errors */
                            errors.title && touched.title &&
                            (<ErrorMessage name="title" component='div' />)
                        }

                        <Field id="content" type="text" name="content"
                               className='form-control form-control-lg mt-2' placeholder="Note Description" />
                        { /* Note Description Errors */
                            errors.content && touched.content &&
                            (<ErrorMessage name="content" component='div' />)
                        }

                        {/* Show Tag list */}
                        <div className='text-start mt-2 mb-2'>
                            {tagList.map((tag, index) => {
                                return(
                                    <div key={index} className="rectangle justify-content-start">
                                        <span className="badge badge-pill badge-info bg-info text-dark mt-2">
                                            {tag}
                                            <i className="bi bi-x"
                                                onClick={() => removeCategory(tag)}/>
                                        </span>
                                    </div>
                                )})
                            }
                        </div>

                        {/* Add new categories */}
                        <div className="d-flex">
                            <Field id="categories" type="text" name="categories"
                                className='form-control form-control-lg mt-2' placeholder="Tag list" />

                            <button className='btn btn-primary btn-lg ms-2 mt-2' data-dismiss="modal"
                                    onClick={e => addCategory(e, values.categories)}>Add</button>
                        </div>

                        {/* Save the new note or close popup */}
                        <div className='d-flex justify-content-center mt-3'>
                            <button className='btn btn-secondary btn-lg' data-dismiss="modal"
                                    onClick={() => cambiarEstado(false)}>
                                Cancel
                            </button>
                            <button type="submit" className='btn btn-primary btn-lg ms-2' data-dismiss="modal">
                                Save
                            </button>
                        </div>
                        {isSubmitting ? (<p>Sending data...</p>) : null}
                    </Form>
                )}
                </Formik>
            </div>
        </div>
    );
};

AddNoteForm.propTypes = {
    add: PropTypes.func.isRequired
};

export default AddNoteForm;
