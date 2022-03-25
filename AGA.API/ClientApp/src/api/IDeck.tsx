import IPoker from './IPoker';

export default interface IDeck {
	id: string;
	description: string;
	pokers: IPoker[];
}
