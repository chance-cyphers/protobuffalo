export const electron = {
    require: jest.fn(),
    match: jest.fn(),
    app: jest.fn(),
    remote: jest.fn(),
    shell: jest.fn(),
    dialog: jest.fn()
};

export const remote = {
    getCurrentWindow: jest.fn(),
    dialog: jest.fn().mockImplementation(win => {
        showOpenDialog: jest.fn(win => win)  // if a sub-module method is needed
    })
};

// for the shell module above
export const shell = {
    openExternal: jest.fn()
};


