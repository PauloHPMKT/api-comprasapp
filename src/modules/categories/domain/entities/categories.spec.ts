import { Category } from './Category';

const makeSut = () => {
  return new Category({
    name: 'anycategoryname',
    icon: '😀',
  });
};

describe('Category Entity', () => {
  it('should be defined', () => {
    const sut = makeSut();
    expect(sut).toBeDefined();
    expect(sut).toBeInstanceOf(Category);
    expect(sut).toBeTruthy();
  });

  it('should create a new Category with name', () => {
    const sut = makeSut();
    expect(sut.props.name).toBe('anycategoryname');
  });

  it('should create a new Category with icon', () => {
    const sut = makeSut();
    expect(sut.props.icon).toEqual('😀');
    expect(typeof sut.props.icon).toBe('string');
  });
});
