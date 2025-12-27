No permite renombrar carpetas

common fixes:

    Stop the dev server (React, Next.js, Vite).

    Reload VS Code (Ctrl+Shift+P → Reload Window).

    If it’s caused by extensions like Live Server try disabling them.

    Rename the folder in File Explorer instead of VS Code.


     onPress={() => {
                            navigation.canGoBack() // taken from navigation
                                ? navigation.goBack()
                                : navigation.dispatch(DrawerActions.toggleDrawer);
                        }}
