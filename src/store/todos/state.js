export default function () {
  return {
    todos: [
      {
        id: "1",
        title: "first todo",
        text: "Nostrud anim enim non laboris laboris ea. Et ipsum fugiat Lorem est aliquip. Voluptate id Lorem adipisicing do officia quis veniam in ullamco veniam. Anim non enim proident laboris elit ea dolore. Nulla culpa in do cupidatat aliqua sunt nulla commodo sit do occaecat minim sint nisi. Consequat aliqua adipisicing dolore incididunt dolor laboris amet.",
        createdAt: "mm/dd/yy",
        isDeleted: false,
        isCompleted: false,
      },
      {
        id: "2",
        title: "second todo",
        text: "Nostrud anim enim non laboris laboris ea. Et ipsum fugiat Lorem est aliquip. Voluptate id Lorem adipisicing do officia quis veniam in ullamco veniam. Anim non enim proident laboris elit ea dolore. Nulla culpa in do cupidatat aliqua sunt nulla commodo sit do occaecat minim sint nisi. Consequat aliqua adipisicing dolore incididunt dolor laboris amet.",
        createdAt: "mm/dd/yy",
        isDeleted: false,
        isCompleted: false,
      },
    ],
    sections: [
      {
        name: "all",
        navIcon: "las la-list-ol",
        navColor: "purple",
      },
      {
        name: "pending",
        navIcon: "las la-list",
        navColor: "amber",
      },
      {
        name: "completed",
        navIcon: "las la-clipboard-check",
        navColor: "green",
      },
      {
        name: "deleted",
        navIcon: "las la-trash",
        navColor: "red",
      },
    ],
  };
}
