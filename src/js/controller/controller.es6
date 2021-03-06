import $ from "jquery";

export class Controller {

    constructor(view) {
        this.view = view;
        this.context = null;
    }

    load(child, controller) {
        if (!(child instanceof $)) {
            child = $(child);
        }

        child.ready(() => {

            var childController = child.data('controller');
            if (childController instanceof Controller) {
                childController.destroy();
                child.removeAttr('data-container');
            }

            //correlate controller and container
            child.data('controller', controller);
            controller.container = child;
            controller.context = this.context;

            child.load(controller.view, () => controller.init());
            child.attr('data-container', '');
        });
    }

    init() {
        console.debug("Init", this)
    }

    destroy() {
        console.debug("Destroy", this)
    }

    getChild(selector) {
        return this.getChildren(selector).first();
    }

    getChildren(selector) {
        if (!(this.container instanceof $)) {
            throw new Error("Controller initialized without container");
        }

        var c = this.container;
        return c.find(selector)
            .not(c.find(':data(controller)').find(selector));
    }
}
