Component({
    mixins: [],
    data: {},
    props: {
        titles: []
    },

    didMount() { },

    didUpdate(prevProps, prevData) {
        console.log(prevProps, prevData);
    },

    didUnmount() { },

    methods: {}
});