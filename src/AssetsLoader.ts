import { Assets, ResolverBundle } from 'pixi.js';

export class AssetsLoader {
    baseList: ResolverBundle = {
        name: 'base',
        assets: [{ name: 'background', srcs: 'assets/background.jpg' }],
    };

    async load(): Promise<void> {
        Assets.addBundle(this.baseList.name, this.baseList.assets);
        return Assets.loadBundle(this.baseList.name);
    }
}
