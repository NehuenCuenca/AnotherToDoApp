const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      {
        path: "/todos/:section?",
        name: "todos-page",
        component: () => import("pages/ToDosPage"),
        props: (route) => ({
          section: route.params.section || "all",
        }),
        // children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
      },
    ],
  },
  ,
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
