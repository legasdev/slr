import React, {useEffect, useState, useCallback} from "react";
import {connect, useSelector} from "react-redux";
import useRedirectToLogin from "@src/hooks/useRedirectLogin";
import {getListTasks} from "../../../redux/tasks-reducer";

import s from "./Tasks.module.less";

import GroupTasks from "./GroupTasks";

import {typeWorks} from "@src/utils/maps";
import Select from "../../common/Form/Select";

const TasksPage = ({ getListTasks, forAllGroup=false }) => {

    const
        RedirectToLogin = useRedirectToLogin();

    const
        [typeTask, setTypeTask] = useState('all'),
        [wasCheckListTask, setWasCheckListTask] = useState(1);

    const
        isAuth = useSelector(state => state.auth.isAuth),
        tasks = useSelector(state => state.tasks.listTasks),
        position = useSelector(state => state.auth.position),
        userNameGroup = useSelector(state => state.auth.groupName);

    const
        onChangeTypeTask = useCallback(({value}) => {
            setTypeTask(value);
        }, []);

    useEffect(() => {
        document.title = `Задания${forAllGroup ? ' группы' : ''} | SLR Project`;
    });

    useEffect(() => {
        if (
            (!tasks ||
            (tasks.lab.length === 0 && tasks.course.length === 0 && tasks.test.length === 0))
            && wasCheckListTask > 0 && isAuth
        ) {
            getListTasks(position, userNameGroup);
            setWasCheckListTask(wasCheckListTask - 1);
        }
    }, [isAuth, wasCheckListTask, tasks, userNameGroup, position, getListTasks]);

    return (
        RedirectToLogin ||
        <section className={s.main}>
            <h2>Задания{forAllGroup ? ` группы ${userNameGroup}` : ''}</h2>
            <div className={s.filters}>
                <Select
                    isMini
                    values={[
                        {name: 'Все типы работ', value: 'all'},
                        {name: typeWorks.get('lab'), value: 'lab'},
                        {name: typeWorks.get('course'), value: 'course'},
                        {name: typeWorks.get('test'), value: 'test'}
                    ]}
                    onChange={onChangeTypeTask}
                />
            </div>
            <div className={s.cardWrapper}>
                {
                    tasks &&
                    (typeTask !== 'all' ?
                        <GroupTasks
                            typeTask={typeTask}
                            tasks={tasks[typeTask]}
                            forAllGroup={forAllGroup}
                        /> :
                        <>
                            <GroupTasks
                                typeTask={'lab'}
                                tasks={tasks.lab}
                                forAllGroup={forAllGroup}
                            />
                            <GroupTasks
                                typeTask={'course'}
                                tasks={tasks.course}
                                forAllGroup={forAllGroup}
                            />
                            <GroupTasks
                                typeTask={'test'}
                                tasks={tasks.test}
                                forAllGroup={forAllGroup}
                            />
                        </>)
                }
            </div>
        </section>
    );
};

export default connect(null, {getListTasks})(TasksPage);