import * as React from 'react';
import style from './style.module.scss';
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Input as MUIInput,
  makeStyles,
  IconButton,
  Tooltip,
  InputBase,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

// icons
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import { useStores } from 'app/stores';
import { WikiPageModel, WikiSectionModel } from 'app/res/Wiki';
import { ContextMenu, Input } from 'app/components/inputs';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 360,
  },
  lists: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1),
  },
  nested: {
    paddingLeft: theme.spacing(6),
  },
  selected: {
    paddingLeft: theme.spacing(6),
    backgroundColor: '#e3e3e3',
  },
}));

export const PageButton = observer((props: { page: WikiPageModel }) => {
  const { page } = props;
  const classes = useStyles();
  const { uistore, workspacesstore } = useStores();

  const menuItems = [
    {
      label: 'Delete',
      onClick: () => {
        uistore.setDeleteTarget(page.data.title, page.onDelete);
      },
    },
  ];
  const selected = workspacesstore.selectedWikiPage?.id === page.id;
  return (
    <li>
      <ContextMenu menuItems={menuItems}>
        <ListItem
          button
          component={Link}
          to={page.link}
          className={selected ? classes.selected : classes.nested}
        >
          <ListItemText primary={page.data.title} />
        </ListItem>
      </ContextMenu>
    </li>
  );
});

export const SectionButton = observer(
  (props: { section: WikiSectionModel; open: boolean; onClick: () => any }) => {
    const { section, open, onClick } = props;
    const form = section.sectionForm;
    const { uistore } = useStores();
    console.log(section.id);
    const menuItems = [
      {
        label: 'Delete',
        onClick: () => {
          uistore.setDeleteTarget(section.data.name, () => {
            console.log(section.id);
            section.onDelete();
          });
        },
      },
    ];

    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        section.onSubmitNameChange();
      }
    };
    return (
      <ListItem>
        <ListItemText>
          <ContextMenu menuItems={menuItems}>
            <InputBase
              value={form.get('name')}
              onChange={form.onChange('name')}
              onKeyDown={handleKeyDown}
            />
          </ContextMenu>
        </ListItemText>
        <Tooltip title="Add Page To Section" aria-label="Add Page To Section">
          <IconButton onClick={section.wikiPages.onAddPage}>
            <AddIcon color="primary" />
          </IconButton>
        </Tooltip>
        <div>
          <IconButton onClick={onClick}>
            {open ? (
              <ExpandMore id="hideWikiPages" />
            ) : (
              <ExpandLess id="showWikiPages" />
            )}
          </IconButton>
        </div>
      </ListItem>
    );
  },
);

export const WikiSectionList = observer(
  (props: { section: WikiSectionModel }) => {
    const { section } = props;
    const { workspacesstore } = useStores();
    const selected = workspacesstore.selectedWikiSection?.id === section.id;

    const pages = section.wikiPages;
    const [open, setOpen] = React.useState(false);
    React.useEffect(() => {
      setOpen(selected || open);
    }, [selected]);
    const onClick = () => {
      setOpen(!open);
    };
    return (
      <>
        <SectionButton section={section} open={open} onClick={onClick} />
        <Collapse component="li" in={open} timeout="auto" unmountOnExit>
          <List disablePadding>
            {pages.map((page) => {
              return <PageButton key={page.id} page={page} />;
            })}
          </List>
        </Collapse>
      </>
    );
  },
);

export const WikiList = observer((props) => {
  const { workspacesstore } = useStores();
  const workspace = workspacesstore.selectedWorkspace;
  if (!workspace) return null;
  const wikiSections = workspace.wikiSections;
  const selectedWikiPage = workspacesstore.selectedWikiPage;
  return (
    <div className={style.sidebar}>
      <div className={style.topsidebar}>
        <ListItem>
          <MUIInput placeholder="Search..." />
          <Tooltip title="Add Section" aria-label="Add Section">
            <IconButton onClick={wikiSections.onAddSection}>
              <AddIcon color="primary" />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Edit Selected Wiki Page"
            aria-label="Edit Selected Wiki Page"
          >
            <IconButton
              color="primary"
              disabled={selectedWikiPage == undefined}
              onClick={() => {
                workspacesstore.wikiEdit = !workspacesstore.wikiEdit;
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </ListItem>
      </div>

      <List>
        {wikiSections.map((section) => {
          return <WikiSectionList key={section.id} section={section} />;
        })}
      </List>
    </div>
  );
});
