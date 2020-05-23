import React, {useCallback, useRef} from "react";
import {connect} from "react-redux";
import {addExercises} from "../../../../redux/exercises-reducer";

import s from "./NewExercises.module.less";

import Popup from "../../../common/Popup";
import Button from "../../../common/Button";
import Form from "../../../common/Form";

const NewExercises = ({onWrapperClose, idTask, nameTask, descriptionTask, addExercises, plagiarismTasks}) => {

    const
        fileRef = useRef(null);

    const
        onAddExercises = useCallback(() => {

            const
                file = fileRef.current.files[0];

            if (file.size <= 2000000 && file.name.match(/\.java$|\.cpp$|\.c$/gi)) {
                addExercises(file, idTask);
            }
        }, [addExercises, idTask]);

    return (
        <Popup
            onWrapperClose={onWrapperClose}
            style={{
                maxWidth: '680px'
            }}
        >
            <div className={s.main}>
                <h3 className={s.title}>Добавить ответ на задание</h3>
                <h4 className={`${s.title} ${s.name}`}>{nameTask}</h4>
                <p className={s.description}>{descriptionTask}</p>
                {
                    plagiarismTasks &&
                        <>
                            <h4 className={`${s.title} ${s.name}`}>Проверка плагиата</h4>
                            <p className={s.description}>{plagiarismTasks}</p>
                        </>
                }

                <div className={s.wrapper}>
                    <Form
                        onSubmit={onAddExercises}
                        style={{
                            maxWidth: '680px',
                            marginTop: '0'
                        }}
                    >
                        <input type={'file'} accept={'.java,.cpp,.c'} ref={fileRef}/>
                        <Button type={'submit'}>Отправить ответ</Button>
                    </Form>
                </div>
            </div>
        </Popup>
    );
};

export default connect(null, {addExercises})(NewExercises);