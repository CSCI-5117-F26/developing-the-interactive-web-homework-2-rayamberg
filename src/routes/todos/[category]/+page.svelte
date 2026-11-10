<h1>todos/:category</h1>
<p>This is the route for the challenge. These pages show a filtered view of the full to do list only showing those items that belong to the category. If you create a todo item from todos/:category it should automatically add that item to that category</p>

<h2>Challenge:</h2>
Extend todos:
<ul>
    <li>show the list of categories as links, the links go to /todos/:category. In other words, keep the existing functionality of /todos (show all of the active to-do items) but also include a list of categories that allows the user to filter to items belonging to that category.</li>
    <li>allow the user to create categories</li>
    <li>allow the user to delete categories. Once deleted, these should no longer show up anywhere in the app. You do not need to trigger a cascading delete. Thinking maybe just strip them of a category.</li>
</ul>