/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import PropTypes from 'prop-types';
import { expect } from 'chai';
import { shallow, mount } from 'enzyme';
import { ComponentRendering, Field, Item, RouteData } from '@sitecore-jss/sitecore-jss';
import { ComponentFactory } from './sharedTypes';
import { Placeholder } from './Placeholder';
import { SitecoreContext } from './SitecoreContext';
import {
  convertedDevData as nonEeDevData,
  convertedLayoutServiceData as nonEeLsData,
} from '../testData/non-ee-data';
import { convertedData as eeData } from '../testData/ee-data';
import { MissingComponent, MissingComponentProps } from './MissingComponent';

const componentFactory: ComponentFactory = (componentName: string) => {
  const components = new Map<string, React.FC>();

  // pass otherProps to page-content to test property cascading through the Placeholder

  const Home: React.FC<{ [prop: string]: unknown; rendering?: RouteData | ComponentRendering }> = ({
    rendering,
    render,
    renderEach,
    renderEmpty,
    ...otherProps
  }) => (
    <div className="home-mock">
      <Placeholder name="page-header" rendering={rendering} />
      <Placeholder name="page-content" rendering={rendering} {...otherProps} />
    </div>
  );
  Home.propTypes = {
    placeholders: PropTypes.object,
  };

  components.set('Home', Home);

  const DownloadCallout: React.FC<{
    [prop: string]: unknown;
    fields?: { message?: { value?: string } };
  }> = (props) => (
    <div className="download-callout-mock">
      {props.fields.message ? props.fields.message.value : ''}
    </div>
  );
  DownloadCallout.propTypes = {
    fields: PropTypes.shape({
      message: PropTypes.shape({
        value: PropTypes.string,
      }),
    }).isRequired,
  };

  components.set('DownloadCallout', DownloadCallout);
  components.set('Jumbotron', () => <div className="jumbotron-mock" />);

  return components.get(componentName) || null;
};

describe('<Placeholder />', () => {
  it('should render without required props', () => {
    const key: string = null;
    const rendering: RouteData = null;
    const renderedComponent = shallow(<Placeholder name={key} rendering={rendering} />);
    expect(renderedComponent.length).to.eql(1);
  });

  const testData = [
    { label: 'Dev data', data: nonEeDevData },
    { label: 'LayoutService data - EE off', data: nonEeLsData },
    { label: 'LayoutService data - EE on', data: eeData },
  ];

  testData.forEach((dataSet) => {
    describe(`with ${dataSet.label}`, () => {
      it('should render a placeholder with given key', () => {
        const component = (dataSet.data.sitecore.route.placeholders.main as (
          | ComponentRendering
          | RouteData
        )[]).find((c) => (c as ComponentRendering).componentName);
        const phKey = 'page-content';

        const renderedComponent = mount(
          <Placeholder name={phKey} rendering={component} componentFactory={componentFactory} />
        );

        expect(renderedComponent.find('.download-callout-mock').length).to.equal(1);
      });

      it('should render nested placeholders', () => {
        const component = dataSet.data.sitecore.route as RouteData;
        const phKey = 'main';

        const renderedComponent = mount(
          <SitecoreContext componentFactory={componentFactory}>
            <Placeholder name={phKey} rendering={component} />
          </SitecoreContext>
        );

        expect(renderedComponent.find('.download-callout-mock').length).to.equal(1);
      });

      it('should render components based on the rendereach function', () => {
        const component = dataSet.data.sitecore.route as RouteData;
        const phKey = 'main';

        const renderedComponent = mount(
          <SitecoreContext componentFactory={componentFactory}>
            <Placeholder
              name={phKey}
              rendering={component}
              renderEach={(comp) => <div className="wrapper">{comp}</div>}
            />
          </SitecoreContext>
        );

        expect(renderedComponent.find('.wrapper').length).to.equal(1);
      });

      it('should render components based on the render function', () => {
        const component = dataSet.data.sitecore.route as RouteData;
        const phKey = 'main';

        const renderedComponent = mount(
          <SitecoreContext componentFactory={componentFactory}>
            <Placeholder
              name={phKey}
              rendering={component}
              render={(comp) => <div className="wrapper">{comp}</div>}
            />
          </SitecoreContext>
        );

        expect(renderedComponent.find('.wrapper').length).to.equal(1);
      });

      it('when null passed to render function', () => {
        it('should render empty placeholder', () => {
          const component = dataSet.data.sitecore.route as RouteData;
          const phKey = 'main';

          const renderedComponent = mount(
            <SitecoreContext componentFactory={componentFactory}>
              <Placeholder name={phKey} rendering={component} render={() => null} />
            </SitecoreContext>
          );

          const placeholder = renderedComponent.find(Placeholder);
          expect(placeholder.length).to.equal(1);
          expect(placeholder.children()).to.be.empty;
        });
      });

      it('should render output based on the renderEmpty function in case of no renderings', () => {
        const component = dataSet.data.sitecore.route as RouteData;
        const renderings = component.placeholders.main.filter(
          (c) => !(c as ComponentRendering).componentName
        );
        const myComponent = {
          ...component,
          placeholders: {
            ...component.placeholders,
            main: [...renderings],
          },
        };

        const phKey = 'main';

        const renderedComponent = mount(
          <SitecoreContext componentFactory={componentFactory}>
            <Placeholder
              name={phKey}
              rendering={myComponent}
              renderEmpty={(comp) => <div className="wrapper">{comp}</div>}
            />
          </SitecoreContext>
        );

        expect(renderedComponent.find('.wrapper').length).to.equal(1);
        expect(renderedComponent.find('.download-callout-mock').length).to.equal(0);
        expect(renderedComponent.find('.home-mock').length).to.equal(0);
        expect(renderedComponent.find('.jumbotron-mock').length).to.equal(0);
      });

      it('should pass properties to nested components', () => {
        const component = dataSet.data.sitecore.route as any;
        const phKey = 'main';
        const expectedMessage = (component.placeholders.main as any[]).find((c) => c.componentName)
          .fields.message;

        const renderedComponent = mount(
          <SitecoreContext componentFactory={componentFactory}>
            <Placeholder name={phKey} rendering={component} />
          </SitecoreContext>
        );

        expect(
          renderedComponent
            .find('.download-callout-mock')
            .html()
            .indexOf(expectedMessage.value) !== -1
        ).to.be.true;
      });
    });
  });

  it('should populate the "key" attribute of placeholder chrome', () => {
    const component: any = eeData.sitecore.route;
    const phKey = 'main';

    const renderedComponent = mount(
      <Placeholder name={phKey} rendering={component} componentFactory={componentFactory} />
    );

    const eeChrome = renderedComponent.find({ chrometype: 'placeholder', kind: 'open', id: phKey });
    expect(eeChrome.length).to.eq(1);
    const keyAttribute = eeChrome.get(0).key;
    expect(keyAttribute).to.not.be.undefined;
    expect(keyAttribute).to.eq(`${phKey}`);
  });

  it('should render null for unknown placeholder', () => {
    const route = ({
      placeholders: {
        main: [
          {
            componentName: 'Home',
          },
        ],
      },
    } as unknown) as RouteData;
    const phKey = 'unknown';

    const renderedComponent = mount(
      <Placeholder name={phKey} rendering={route} componentFactory={componentFactory} />
    );
    expect(renderedComponent.html()).to.be.empty;
  });

  it('should render error message on error', () => {
    const componentFactory: ComponentFactory = (componentName: string) => {
      const components = new Map<string, React.FC>();

      const Home: React.FC<{ rendering?: RouteData }> = ({ rendering }) => (
        <div className="home-mock">
          <Placeholder name="main" rendering={rendering} />
        </div>
      );

      components.set('Home', Home);
      components.set('ThrowError', () => {
        throw Error('an error occured');
      });
      return components.get(componentName) || null;
    };

    const route = ({
      placeholders: {
        main: [
          {
            componentName: 'ThrowError',
          },
        ],
      },
    } as unknown) as RouteData;
    const phKey = 'main';

    const renderedComponent = mount(
      <Placeholder name={phKey} rendering={route} componentFactory={componentFactory} />
    );
    expect(renderedComponent.find('.sc-jss-placeholder-error').length).to.equal(1);
  });

  it('should render custom errorComponent on error, if provided', () => {
    const componentFactory: ComponentFactory = (componentName: string) => {
      const components = new Map<string, React.FC<{ [key: string]: unknown }>>();

      const Home: React.FC<{ rendering?: RouteData }> = ({ rendering }) => (
        <div className="home-mock">
          <Placeholder name="main" rendering={rendering} />
        </div>
      );

      components.set('Home', Home);
      components.set('ThrowError', () => {
        throw Error('an error occured');
      });
      return components.get(componentName) || null;
    };

    const CustomError: React.FC = () => <div className="custom-error">Custom Error</div>;

    const route = ({
      placeholders: {
        main: [
          {
            componentName: 'ThrowError',
          },
        ],
      },
    } as unknown) as RouteData;
    const phKey = 'main';

    const renderedComponent = mount(
      <Placeholder
        name={phKey}
        rendering={route}
        componentFactory={componentFactory}
        errorComponent={CustomError}
      />
    );
    expect(renderedComponent.find('.custom-error').length).to.equal(1);
  });
});

it('should render MissingComponent for unknown rendering', () => {
  const route: any = {
    placeholders: {
      main: [
        {
          componentName: 'Unknown',
        },
      ],
    },
  };
  const phKey = 'main';

  const CustomMissingComponent: React.FC<MissingComponentProps> = (props) => (
    <div className="missing-component">
      <MissingComponent {...props} />
    </div>
  );

  const renderedComponent = mount(
    <Placeholder
      name={phKey}
      rendering={route}
      componentFactory={componentFactory}
      missingComponentComponent={CustomMissingComponent}
    />
  );
  expect(renderedComponent.find('.missing-component').length).to.equal(1);
});

after(() => {
  (global as any).window.close();
});
