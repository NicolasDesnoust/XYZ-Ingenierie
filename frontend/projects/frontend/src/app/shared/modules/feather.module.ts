import { NgModule } from '@angular/core';
import { FeatherModule } from 'angular-feather';
import {
  ArrowLeftCircle,
  ArrowRightCircle, Camera, Edit, Eye, FileText, Filter, Github,
  Grid, Heart, Key, List, LogOut, MoreVertical, Plus,
  RefreshCw, RotateCw, Save, Search, Settings, Trash2, Trello, User, Users
} from 'angular-feather/icons';


// Select some icons (use an object, not an array)
const icons = {
  Camera,
  Heart,
  Github,
  Grid,
  List,
  Plus,
  RefreshCw,
  Filter,
  Settings,
  User,
  Search,
  MoreVertical,
  Eye,
  Trash2,
  Edit,
  FileText,
  Users,
  Key,
  Save,
  RotateCw,
  ArrowLeftCircle,
  ArrowRightCircle,
  Trello,
  LogOut
};

@NgModule({
  imports: [FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class CustomFeatherModule {}
